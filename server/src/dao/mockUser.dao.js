import bcrypt from "bcryptjs";

const users = [];

export const mockDaoUser = {
  findByEmail: (email) => {
    users.find((user) => user.email === email);
  },

  findById: (id) => {
    users.find((user) => user.id === id);
  },

  create: async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = {
      id: String(users.length + 1),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      ownedLists: [],
      sharedLists: [],
    };

    users.push(newUser);
    return newUser;
  },
  comparePasswords: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

  addToOwnedLists: (userId, listId) => {
    const user = users.find((user) => user.id === userId);

    if (user && !user.ownedLists.includes(listId)) {
      user.ownedLists.push(listId);
    }
  },

  addToSharedLists: (userId, listId) => {
    const user = users.find((user) => user.id === userId);

    if (user && !user.sharedLists.includes(listId)) {
      user.sharedLists.push(listId);
    }
  },

  removeFromSharedLists: (userId, listId) => {
    const user = users.find((user) => user.id === userId);

    if (user) {
      user.sharedLists = user.sharedLists.filter((id) => id !== listId);
    }
  },
};
