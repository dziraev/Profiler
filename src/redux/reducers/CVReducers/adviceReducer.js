const initialState = {
  advices: [
    {
      name: 'default',
      title: 'Advice on filling in',
      text: 'Click on the field to get a hint. Please fill in all fields in <strong>English<strong>.'
    },
    {
      name: 'name',
      title: 'Name',
      text: 'Write your name in a full form.<br /> Do not use the abbreviation. <p><strong>Example:</strong> Alexey, not Alex.</p>'
    },
    {
      name: 'surname',
      title: 'Surname',
      text: 'Write your surname in a full form. <p><strong>Example:</strong> Ivanov, Petrova.</p>'
    },
    {
      name: 'position',
      title: 'Position',
      text: 'Choose a position from the list according to the course you completed at the IT-Academy.'
    },
    {
      name: 'country',
      title: 'Country',
      text: 'Indicate the current country where you are looking for a job.'
    },
    {
      name: 'city',
      title: 'City',
      text: 'Write the current city where you are looking for a job. <p><strong>Example:</strong> Minsk, Saint Petersburg, Ust-Kamenogorsk</p>'
    }
  ]
};

export const adviceReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
