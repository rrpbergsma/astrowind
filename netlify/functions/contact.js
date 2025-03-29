import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

export const handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const DOMPurify = createDOMPurify(new JSDOM('').window);

    // Sanitize user input
    const sanitizedData = {
      name: DOMPurify.sanitize(data.name),
      email: DOMPurify.sanitize(data.email),
      message: DOMPurify.sanitize(data.message),
    };

    // TODO: Process the sanitized data (e.g., send an email)
    console.log('Sanitized data:', sanitizedData);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully!' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'An error occurred.' }),
    };
  }
};