import { MailAdapter } from '../adapters/mail.adapter';
import { FeedbacksRepository } from '../repositories/feedbacks.repository';

export interface SubmitFeedbackFunctionCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackFunction {
  constructor(
    private feedBackRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) { }

  async execute(request: SubmitFeedbackFunctionCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) throw new Error("Type is required.");

    if (!comment) throw new Error("comment is required.");

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error("comment is required.");
    }

    await this.feedBackRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join('\n'),
    });


  }
}