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
  const updatedList = list.filter((el) => el.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedList));
  const deletedContact = list.find((el) => el.id === contactId);
  return deletedContact;
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
  list[idx] = { id: contactId, ...body };
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
