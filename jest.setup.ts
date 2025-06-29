import "@testing-library/jest-dom";

class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
    this.pointerType = props.pointerType || 'mouse';
  }
}

// @ts-ignore
window.PointerEvent = MockPointerEvent;

Object.assign(window.HTMLElement.prototype, {
  scrollIntoView: jest.fn(),
  hasPointerCapture: jest.fn(),
  releasePointerCapture: jest.fn(),
});