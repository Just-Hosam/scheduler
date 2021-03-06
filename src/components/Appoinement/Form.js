import React, { useState } from 'react';

// Import Components
import Button from '../Button';
import InterviewerList from '../InterviewerList';

const Form = (props) => {
	const [name, setName] = useState(props.name || '');
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
	const [error, setError] = useState('');

	// resets the name and interviewer states
	const reset = () => {
		setName('');
		setInterviewer(null);
	};

	const cancel = () => {
		reset();
		props.onCancel();
	};

	// Helper function, checks if the input was blank then shows a visual que
	function validate() {
		if (name === '' || interviewer === null) {
			const studentError = 'Student name cannot be blank';
			const interviewerError = 'Please select an interviewer';

			setError(name ? interviewerError : studentError);
			return;
		}

		// if the input is not empty, the data is saved and the error message is reset
		props.onSave(name, interviewer, props.isNew);
		setError('');
	}

	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
					<input
						data-testid="student-name-input"
						className="appointment__create-input text--semi-bold"
						name="name"
						type="text"
						placeholder="Enter Student Name"
						onChange={(event) => setName(event.target.value)}
						value={name}
					/>
					<section className="appointment__validation">{error}</section>
				</form>
				<InterviewerList
					interviewers={props.interviewers}
					value={interviewer}
					onChange={setInterviewer}
				/>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={cancel}>
						Cancel
					</Button>
					<Button confirm onClick={validate}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
};

export default Form;
