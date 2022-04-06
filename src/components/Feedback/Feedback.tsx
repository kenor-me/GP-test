import { FeedbackTitle, FeedbackSubTitle, FeedbackBox } from './Feedback.styles';

type TProps = {
  comment: string;
  phoneNumb: string;
};

export const Feedback: React.FC<TProps> = ({ comment, phoneNumb }): JSX.Element => {
  return (
    <FeedbackBox>
      <FeedbackTitle>Phone</FeedbackTitle>
      <FeedbackSubTitle>{phoneNumb}</FeedbackSubTitle>
      <FeedbackTitle>Comment</FeedbackTitle>
      <FeedbackSubTitle>{comment}</FeedbackSubTitle>
    </FeedbackBox>
  );
};
