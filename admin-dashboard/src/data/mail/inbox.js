import {faker} from '@faker-js/faker';
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateMails(quantity) {
  const mails = [];

  for (let i = 1; i <= quantity; i++) {
    const mail = {
      check: false,
      name: faker.internet.userName(),
      email: faker.internet.email(),
      subject: faker.company.name(),
      description: faker.commerce.productDescription(),
      created_at: randomDate(new Date(), new Date(2024, 11, 31)),
    };
    mails.push(mail);
  }

  return mails;
}

export const mails = generateMails(20);