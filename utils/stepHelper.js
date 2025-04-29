export async function runStep(label, fn, stepFn) {
    if (typeof stepFn === 'function') {
      return await stepFn(label, fn);
    } else {
      return await fn();
    }
  }
  