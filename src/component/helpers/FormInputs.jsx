import { useField } from "formik";
import { NumericFormat } from "react-number-format";
import React from "react";

export const InputTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea
        className={meta.touched && meta.error ? "error-show" : null}
        {...field}
        {...props}
      ></textarea>
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputText = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  if (props.num === "num") {
    return (
      <>
        <NumericFormat
          {...field}
          {...props}
          allowLeadingZeros
          thousandSeparator=","
          decimalScale={4}
          // prefix={"P "}
        />

        <label htmlFor={props.id || props.name}>{label}</label>
        {meta.touched && meta.error ? (
          <span className="error-show">{meta.error}</span>
        ) : null}
      </>
    );
  } else {
    return (
      <>
        <input
          {...field}
          {...props}
          className={meta.touched && meta.error ? "error-show" : null}
        />
        <label htmlFor={props.id || props.name}>{label}</label>
        {meta.touched && meta.error ? (
          <span className="error-show">{meta.error}</span>
        ) : null}
      </>
    );
  }
};

export const InputSelect = ({ label, onChange, ...props }) => {
  const [field, meta] = useField(props);

  if (
    props.name === "earnings_paytype_id" ||
    props.name === "earnings_payitem_id" ||
    props.name === "payroll_employee" ||
    props.name === "rates_paytype_id" ||
    props.name === "rates_payitems_id" ||
    props.name === "is_installment" ||
    props.name === "employee_job_supervisor_name" ||
    props.name === "deduction_paytype_id"
  ) {
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>

        <select
          {...field}
          {...props}
          className={meta.touched && meta.error ? "error-show" : null}
          onChange={(e) => {
            onChange(e);
            field.onChange(e);
          }}
        />

        {meta.touched && meta.error ? (
          <span className="error-show">{meta.error}</span>
        ) : null}
      </>
    );
  }
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>

      <select
        {...field}
        {...props}
        className={meta.touched && meta.error ? "error-show" : null}
        onChange={(e) => {
          // handleChangeLeave(e);
          field.onChange(e);
        }}
      />

      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputFileUpload = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <span className="error--msg">{meta.error}</span>
      ) : null}
    </>
  );
};
export const MyRadio = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <input {...field} {...props} />
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "error-show" : ""}
      >
        {label}
      </label>

      {/* {meta.touched && meta.error ? (
        <p className="error-msg">{meta.error}</p>
      ) : null} */}
    </>
  );
};

export const MyRadioError = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const MyEmpty = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return meta.touched && meta.error ? (
    <span className="error-show">{meta.error}</span>
  ) : null;
};

export const MyRecpatcha = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div
        className="g-recaptcha"
        data-sitekey="6Lc7UxYjAAAAAB3xCb7xGm279HSHfsATbUjn_ss8"
      ></div>

      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const MyCheckbox = ({ label, open, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <input
        {...field}
        {...props}
        className={meta.touched && meta.error ? "error-show w-8" : "w-8"}
      />
      <label className="label" htmlFor={props.id || props.name}>
        {label}
      </label>
      {/* <span htmlFor={props.id || props.name}>{label}</span> */}
      {meta.touched && meta.error ? (
        <small className="msg--error">{meta.error}</small>
      ) : null}
    </>
  );
};
