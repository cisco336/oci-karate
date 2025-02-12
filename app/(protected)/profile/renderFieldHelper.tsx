import { capitalizeFirstLetter } from '@/helpers/capitalize';
import { Field, ErrorMessage } from 'formik';

export const renderField = (
  field: {
    name: string;
    label: string;
    type: string;
    enumName?: string;
    disabled?: boolean;
  },
  enums: { [key: string]: string[] },
) => {
  const fieldClassNames =
    'border border-slate-500 rounded-md py-2 px-3 bg-transparent text-gray-300';

  return (
    <div
      key={field.name}
      className={`${field.type === 'checkbox' ? 'flex gap-4 py-4' : 'flex flex-col gap-1 mb-[1rem]'}`}>
      <label htmlFor={field.name}>{field.label}</label>
      {['text', 'textarea', 'date', 'password', 'checkbox'].includes(
        field.type,
      ) ? (
        <Field
          className={fieldClassNames}
          type={field.type}
          name={field.name}
          disabled={Boolean(field.disabled)}
        />
      ) : (
        <Field
          className={fieldClassNames}
          type={field.type}
          name={field.name}
          component="select">
          {field.enumName &&
            enums[field.enumName ?? ''].map((c) => (
              <option
                key={c}
                value={c}>
                {capitalizeFirstLetter(c.replaceAll('_', ' ').toString())}
              </option>
            ))}
        </Field>
      )}
      <ErrorMessage
        name={field.name}
        component="div"
      />
    </div>
  );
};
