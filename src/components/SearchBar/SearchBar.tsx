import { Formik, Form, Field } from 'formik';
import type { FormikHelpers } from 'formik';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

interface FormValues {
  query: string;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    if (!values.query || values.query.trim() === '') {
      toast.error('Please enter your search query.');
      actions.setSubmitting(false);
      return;
    }
    onSubmit(values.query);
    actions.setSubmitting(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <Formik
          initialValues={{ query: '' }}
          onSubmit={handleSubmit}
        >
          <Form className={styles.form}>
            <Field
              className={styles.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={styles.button} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </div>
    </header>
  );
}
