import React from 'react';
import Form from 'react-bootstrap/Form';

type CheckboxProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
}

const Checkbox = ({ onChange, value, label }: CheckboxProps) => {
  return (
    <div className="form-check">
      <Form>
        <Form.Check type="checkbox" className="d-flex align-items-center p-0">
          <Form.Check.Input type="checkbox" id="showEven" isValid onChange={onChange} value={value} />
          <Form.Check.Label className="text-dark" htmlFor="showEven"><b>{label}</b></Form.Check.Label>
        </Form.Check>
      </Form>
    </div>
  )
}

export default Checkbox;