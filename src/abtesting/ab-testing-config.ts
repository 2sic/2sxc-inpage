enum ABTest { A, B }

/** config A or B */
const testing: ABTest = ABTest.B;

export const isA = (testing < ABTest.B);
