enum ABTest { A, B }

/** config A or B */
const testing: ABTest = ABTest.A;

export const isA = (testing < ABTest.B);
