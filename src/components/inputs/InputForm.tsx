import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export default function InputForm({
  value,
  label,
  placeholder,
  name,
  type,
  error,
  touched,
  onChangeMethod,
  onBlurMethod,
  maxLength,
  disabled,
  readonly,
  className,
  required,
  autocomplete,
  autosave,
  max,
}: {
  value: string | string[] | number;
  label?: string;
  placeholder?: string;
  name: string;
  type: string;
  error?: string;
  touched?: boolean;
  onChangeMethod?: any;
  onBlurMethod?: any;
  maxLength?: number;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
  required?: boolean;
  autocomplete?: string;
  autosave?: string;
  max?: string | number;
}) {
  const [showText, setShowText] = useState(false);

  function getType(): string {
    if (type !== "password") return type;
    return showText ? "text" : "password";
  }
  return (
    <>
      <Form.Group className="mb-3 position-relative">
        <Form.Label htmlFor={name}>
          {label} {required && <span className="text-danger text-white">*</span>}
        </Form.Label>
        {type === "password" ? (
          <InputGroup>
            <Form.Control
              type={getType()}
              id={name}
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={onChangeMethod}
              onBlur={onBlurMethod}
              isInvalid={!!error && touched}
              className={className}
              disabled={disabled}
              readOnly={readonly}
              maxLength={maxLength}
              autoComplete={autocomplete}
              autoSave={autosave}
              onCopy={(e) => e.preventDefault()}
              max={max}
            />
            {type === "password" && (
              <Button
                variant="outline-info rounded-end"
                onClick={() => setShowText(!showText)}
              >
                <FontAwesomeIcon
                  icon={showText ? faEyeSlash : faEye}
                  style={{ minWidth: "15px", maxWidth: "15px" }}
                />
              </Button>
            )}
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </InputGroup>
        ) : (
          <>
            <Form.Control
              type={getType()}
              id={name}
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={onChangeMethod}
              onBlur={onBlurMethod}
              isInvalid={!!error && (touched || type === "hidden")}
              className={className}
              disabled={disabled}
              readOnly={readonly}
              maxLength={maxLength}
              autoComplete={autocomplete}
              autoSave={autosave}
              max={max}
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </>
        )}
      </Form.Group>
    </>
  );
}
