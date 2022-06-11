import { Feedback } from '@app/feedback/feedback.schema';

export interface FeedbacksResponseInterface {
  feedback: Feedback[],
  feedbackCount: number
}
