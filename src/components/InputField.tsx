import { type FC } from "react";
import { Button, Spinner } from "react-bootstrap";
import "./InputField.css";

interface Props {
  value: string;
  setValue: (value: string) => void;
  onSubmit: (value: string) => void;
  loading?: boolean;
  placeholder?: string;
  buttonTitle?: string;
}

const InputField: FC<Props> = ({
  value,
  setValue,
  onSubmit,
  loading,
  placeholder,
  buttonTitle = "Искать",
}) => {
  const handleClick = () => {
    onSubmit(value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(value);
    }
  };

  return (
    <div className="search-form">
      <i className="bi bi-search search-icon"></i>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleEnter}
        disabled={loading}
      />
      <Button onClick={handleClick} disabled={loading} className="search-button text-white">
        {loading ? <Spinner animation="border" size="sm" /> : buttonTitle}
      </Button>
    </div>
  );
};


export default InputField;
