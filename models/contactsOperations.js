const fs = require("fs/promises");
const { uid } = require("uid");

const contactsPath = require("../filePath");

const listContacts = async () => {
  const list = await fs.readFile(contactsPath);
  return JSON.parse(list);
};

const getContactById = async (contactId) => {
  const list = await listContacts();
  const contact = list.find((el) => el.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const list = await listContacts();

  const idx = list.findIndex((item) => item.id === contactId);
  const deletedContact = list.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(list));
  return deletedContact[0];
};

const addContact = async (body) => {
  const list = await listContacts();
  const newContact = { id: uid(4), ...body };
  list.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(list));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const list = await listContacts();
  const idx = list.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }

  list[idx] = { ...list[idx], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(list));
  return list[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
