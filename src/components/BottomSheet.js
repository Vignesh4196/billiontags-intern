import React from 'react';
import {
  Modal,
  View,
  Animated,
  Easing,
  PanResponder,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import { colors, spacing, radius } from '../theme';

// Space left above a fully expanded sheet.
const TOP_GAP = 24;
// Dragging the sheet this far below its resting position closes it.
const CLOSE_DRAG = 100;

function SimpleSheet({ visible, onClose, children, style, handleStyle }) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={[styles.sheet, style]}>
        <View style={[styles.handle, handleStyle]} />
        {children}
      </View>
    </Modal>
  );
}

// Opens at `collapsedRatio` of the screen height (3/4 by default). Pulling the sheet up (or tapping the
// handle) expands it to its full height so everything below is visible without scrolling; pulling it
// down goes back, and pulling it far enough down closes it. If the content is shorter than the resting
// height the sheet simply opens fully. Only a screen too short for the whole content falls back to a scroll.
function ExpandableSheet({ visible, onClose, children, style, handleStyle, contentStyle, collapsedRatio }) {
  const { height: windowHeight } = useWindowDimensions();
  const [sheetHeight, setSheetHeight] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const translateY = React.useRef(new Animated.Value(windowHeight)).current;
  const dragStart = React.useRef(0);

  const maxHeight = windowHeight - TOP_GAP;
  // How far the sheet is pushed down while collapsed (0 when everything already fits in the resting height).
  const restOffset = sheetHeight ? Math.max(0, sheetHeight - windowHeight * collapsedRatio) : 0;
  const overflowing = sheetHeight > 0 && sheetHeight >= maxHeight - 1;

  // The pan handlers are created once, so they read the latest numbers from here.
  const latest = React.useRef({});
  latest.current = { restOffset, sheetHeight, onClose };

  const settle = React.useCallback((toValue, done) => {
    Animated.timing(translateY, { toValue, duration: 240, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start(({ finished }) => {
      if (finished && done) done();
    });
  }, [translateY]);

  const closeSheet = React.useCallback(() => {
    settle(latest.current.sheetHeight || windowHeight, () => latest.current.onClose());
  }, [settle, windowHeight]);

  const toggle = () => {
    const { restOffset: rest } = latest.current;
    if (rest <= 0) return;
    const goExpanded = !expanded;
    setExpanded(goExpanded);
    settle(goExpanded ? 0 : rest);
  };

  // Slide in when opened (once the sheet has been measured), reset when closed.
  React.useEffect(() => {
    if (!visible) {
      translateY.setValue(windowHeight);
      setExpanded(false);
      return;
    }
    if (!sheetHeight) return;
    translateY.setValue(sheetHeight);
    settle(latest.current.restOffset);
    setExpanded(latest.current.restOffset === 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, sheetHeight]);

  const finishDrag = (gesture) => {
    const { restOffset: rest } = latest.current;
    const y = Math.max(0, dragStart.current + gesture.dy);
    // Look a little ahead so a quick flick counts.
    const projected = y + gesture.vy * 120;
    if (projected > rest + CLOSE_DRAG) {
      closeSheet();
      return;
    }
    const target = rest > 0 && projected > rest / 2 ? rest : 0;
    setExpanded(target === 0);
    settle(target);
  };

  const pan = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 6 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderGrant: () => {
        translateY.stopAnimation((value) => {
          dragStart.current = value;
        });
      },
      onPanResponderMove: (_, g) => translateY.setValue(Math.max(0, dragStart.current + g.dy)),
      onPanResponderRelease: (_, g) => finishDrag(g),
      onPanResponderTerminate: (_, g) => finishDrag(g),
    }),
  ).current;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={closeSheet}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View
        {...pan.panHandlers}
        onLayout={(event) => setSheetHeight(event.nativeEvent.layout.height)}
        style={[styles.sheet, style, { maxHeight, opacity: sheetHeight ? 1 : 0, transform: [{ translateY }] }]}
      >
        <Pressable
          onPress={toggle}
          hitSlop={{ top: 12, bottom: 12, left: 40, right: 40 }}
          accessibilityRole="button"
          accessibilityLabel={expanded ? 'Collapse' : 'Expand'}
          style={styles.handleHit}
        >
          <View style={[styles.handle, handleStyle]} />
        </Pressable>
        <ScrollView
          scrollEnabled={expanded && overflowing}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={contentStyle}
        >
          {children}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

export default function BottomSheet({ expandable = false, collapsedRatio = 0.75, ...props }) {
  return expandable
    ? <ExpandableSheet collapsedRatio={collapsedRatio} {...props} />
    : <SimpleSheet {...props} />;
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    padding: spacing.xl,
    paddingBottom: spacing.xxl + 16,
  },
  handleHit: {
    alignSelf: 'center',
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginBottom: spacing.lg,
  },
});
