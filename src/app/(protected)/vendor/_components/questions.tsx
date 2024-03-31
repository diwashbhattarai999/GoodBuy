import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";

import { DefaultValuesType } from "./create-product-form";

interface QuestionsProps {
  questions: { question: string; answer: string }[];
  product: DefaultValuesType;
  setProduct: React.Dispatch<React.SetStateAction<DefaultValuesType>>;
}

export default function Questions({
  questions,
  product,
  setProduct,
}: QuestionsProps) {
  const handleQuestions = (
    i: number,
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = questions.map((item, index) => {
      if (index === i) {
        return {
          ...item,
          [e.target.name]: e.target.value,
        };
      }
      return item;
    });
    setProduct({ ...product, questions: values });
  };

  const handleRemove = (i: number) => {
    const values = [...questions];
    values.splice(i, 1);
    setProduct({ ...product, questions: values });
  };

  const handleAddQuestions = () => {
    setProduct({
      ...product,
      questions: [...questions, { question: "", answer: "" }],
    });
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="">Questions</div>

      {questions.length === 0 && (
        <BsFillPatchPlusFill
          onClick={handleAddQuestions}
          className="text-accent w-7 h-7"
        />
      )}

      {questions.map((question, i) => (
        <div className="flex items-end gap-3" key={i}>
          <div className="flex flex-col gap-1">
            <label className="text-primary-foreground font-medium cursor-pointer">
              Question
            </label>
            <input
              type="text"
              name="question"
              placeholder="Question"
              value={question.question}
              onChange={(e) => handleQuestions(i, e)}
              className="h-full p-2 bg-transparent border rounded-md text-primary-foreground placeholder:text-secondary-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 border-input focus:border-secondary-foreground"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-primary-foreground font-medium cursor-pointer">
              Answer
            </label>
            <input
              type="text"
              name="answer"
              placeholder="Answer"
              value={question.answer}
              onChange={(e) => handleQuestions(i, e)}
              className="h-full p-2 bg-transparent border rounded-md text-primary-foreground placeholder:text-secondary-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 border-input focus:border-secondary-foreground"
            />
          </div>

          <>
            <BsFillPatchMinusFill
              onClick={() => handleRemove(i)}
              className="text-accent w-7 h-7"
            />
            <BsFillPatchPlusFill
              onClick={handleAddQuestions}
              className="text-accent w-7 h-7"
            />
          </>
        </div>
      ))}
    </div>
  );
}
