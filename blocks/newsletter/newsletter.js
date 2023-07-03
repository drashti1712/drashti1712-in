import { getLibs } from "../../scripts/utils.js";
const { createTag } = await import(`${getLibs()}/utils/utils.js`);

function getForm(formTitle) {
  // const { createTag } = await import(`${getLibs()}/utils/utils.js`);
  const formButton = createTag('button', {}, formTitle.textContent);
  const firstName = createTag('input', {type: 'text', placeHolder: 'First Name'});
  const lastName = createTag('input',  {type: 'text', placeHolder: 'Last Name'});
  const email = createTag('input',  {type: 'text', placeHolder: 'Email'});
  const form = createTag('form', {}, [firstName, lastName, email, formButton]);

  form.addEventListener('submit',async (e) => {
    e.preventDefault();
    const data = { firstName: firstName.value, lastName: lastName.value, email: email.value};
    const resp = await fetch('/email-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data })
    });
    if(!resp.ok) console.log(resp);
    const json = await resp.json();
    console.json(json);
  });

  return form;
}




export default async function init(el) {
  const titles = [...el.querySelectorAll('h1, h2, h3, h4, h5, h6, p')]; //no matter what the first el is
  console.log(titles);
  // el.innerHTML - '';
  const { createTag } = await import(`${getLibs()}/utils/utils.js`);
  const memberList = createTag('ul', {});
  const resp = await fetch('/email-list.json');
  if(!resp.ok) return;
  const json = await resp.json();
  console.log('---', json);
  json.data.forEach(element => {
    const person = createTag('li', {}, `${element.firstName} ${element.lastName}`);
    memberList.append(person);
  });
  const form = getForm(titles.shift());
  const listTitle = titles.shift();
  const submitTitle = titles.shift();
  el.append(listTitle, memberList, submitTitle, form);
}
