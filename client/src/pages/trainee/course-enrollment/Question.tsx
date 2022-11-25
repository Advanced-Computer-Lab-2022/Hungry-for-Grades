import { QuestionOptionStatus, QuestionStatus } from './question-types';

type QuestionProps = {
  optionSelected: (
    question: QuestionStatus,
    option: QuestionOptionStatus
  ) => void;
} & QuestionStatus;

function Question(props: QuestionProps) {
  const name = `question-${props.questionNumber}`;
  return (
    <div>
      {props.options.map((o, index) => (
        <div key={`a${props.questionNumber}-${o.index}`} className='form-check'>
          <input
            checked={o.isSelected}
            className='form-check-input'
            disabled={o.disabled}
            id={`${name}-${index}`}
            name={name}
            type='radio'
            value={o.answer}
            onChange={() => props.optionSelected(props, o)}
          />
          <label className='form-check-label' htmlFor={`${name}-${index}`}>
            {o.answer}
          </label>
        </div>
      ))}
    </div>
  );
}

export default Question;
