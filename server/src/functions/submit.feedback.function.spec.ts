import { SubmitFeedbackFunction } from "./submit.feedback.function";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackFunction = new SubmitFeedbackFunction(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedbackFunction.execute({
        type: 'BUG',
        comment: 'exampla comment',
        screenshot: 'data:image/png;base64,asm.djnfm,ncv,mnajklsdhfajsdnflmtest.jpg',
      }),
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(
      submitFeedbackFunction.execute({
        type: '',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,asm.djnfm,ncv,mnajklsdhfajsdnflmtest.jpg',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback without commet', async () => {
    await expect(
      submitFeedbackFunction.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,asm.djnfm,ncv,mnajklsdhfajsdnflmtest.jpg',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback with invalid screenshot', async () => {
    await expect(
      submitFeedbackFunction.execute({
        type: 'BUG',
        comment: 'ta tudo bugado',
        screenshot: 'test.jpg',
      }),
    ).rejects.toThrow();
  })
});