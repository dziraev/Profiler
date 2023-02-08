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
    },

    {
      name: 'phone',
      title: 'Phone',
      text: 'Enter your actual phone number.'
    },
    {
      name: 'email',
      title: 'Email',
      text: 'Enter your actual email. Do not use funny email or an email with the employer’s domain. Use the email which contains your real name and surname. <p><strong>Example:</strong> name.surname@gmail.com, n.surname@gmail.com</p>'
    },
    {
      name: 'skype',
      title: 'Skype',
      text: 'The field Skype is optional.<br/>Copy your Login in the settings of your personal Skype account and paste it into the field. <p><strong>Example:</strong> live:example, facebook:example</p>'
    },
    {
      name: 'linkedin',
      title: 'LinkedIn',
      text: 'Provide a link to your Linkedin profile. Сustomize the link by using your name in the URL.<br/> Follow the link <a target="_blank" href="https://www.linkedin.com/help/linkedin/answer/a545612/-url-?lang=en">link</a> to read more about name customization. <p><strong>Example:</strong> https://linkedin.com/in/ivan-ivanov</p>'
    },
    {
      name: 'portfolio',
      title: 'Portfolio',
      text: 'The field Portfolio is optional. But we recommend you to fill in this field in order to have a better chance of employment. <p>Use specialized resources — Github, Dribble, Behance or put your artifacts to the folder on Google Drive.</p>'
    }
  ]
};

export const adviceReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
