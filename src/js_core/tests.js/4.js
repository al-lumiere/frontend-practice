// ======================================================
// PART 1.
// ======================================================

// ------------------------------------------------------
// Task 1. getJSON
// ------------------------------------------------------
//
// Напиши функцию getJSON(url), которая:
// 1. делает fetch(url)
// 2. проверяет response.ok
// 3. если response.ok === false, кидает ошибку
// 4. если всё хорошо, возвращает response.json()

async function getJSON(url) {
  let response = await fetch(url);

  if (!response.ok) {
    throw new Error (`${response.status}`)
  }

  return await response.json()
}

// ------------------------------------------------------
// Task 2. getText
// ------------------------------------------------------
//
// Напиши функцию getText(url), которая:
// 1. делает fetch(url)
// 2. проверяет response.ok
// 3. возвращает response.text()

async function getText(url) {
  let res = await fetch(url);

  if (!res.ok) {
    throw new Error (`HTTP error: ${res.status}`)
  }

  return res.text();
}

// ------------------------------------------------------
// Task 3. createUser
// ------------------------------------------------------
//
// Напиши функцию createUser(user), которая отправляет пользователя на сервер.
//
// Требования:
// 1. URL: /api/users
// 2. method: POST
// 3. headers: Content-Type: application/json
// 4. body: JSON.stringify(user)
// 5. если response.ok === false, кинуть ошибку
// 6. если всё хорошо, вернуть response.json()

async function createUser(user) {
  let response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })


  if (!response.ok) {
    throw new Error (`HTTP error: ${response.status}`)
  }

  return await response.json();
}

// // ======================================================
// // PART 2. Loading / error / data
// // ======================================================

// // ------------------------------------------------------
// // Task 4. loadUser
// // ------------------------------------------------------
// //
// // Есть объект состояния.
// // Напиши функцию loadUser(id), которая:
// // 1. перед запросом ставит:
// //    loading: true
// //    data: null
// //    error: null
// // 2. делает запрос /api/users/${id}
// // 3. при успехе кладёт данные в userState.data
// // 4. при ошибке кладёт ошибку в userState.error
// // 5. в любом случае в finally ставит loading: false

// const userState = {
// loading: false,
// data: null,
// error: null,
// };

// async function loadUser(id) {
// // TODO
// }

// // ------------------------------------------------------
// // Task 5. loadUsers
// // ------------------------------------------------------
// //
// // Напиши функцию loadUsers(), которая загружает список пользователей.
// //
// // Состояние:
// // usersState.loading
// // usersState.users
// // usersState.error
// //
// // При старте:
// // loading: true
// // users: []
// // error: null
// //
// // При успехе:
// // usersState.users = data
// //
// // При ошибке:
// // usersState.error = error
// //
// // В finally:
// // loading: false

// const usersState = {
// loading: false,
// users: [],
// error: null,
// };

// async function loadUsers() {
// // TODO
// }

// // ======================================================
// // PART 3. Последовательно и параллельно
// // ======================================================

// // ------------------------------------------------------
// // Task 6. loadUserAndPostsSequential
// // ------------------------------------------------------
// //
// // Есть две функции:
// //
// // async function getUser(id) {
// //   return getJSON(`/api/users/${id}`);
// // }
// //
// // async function getPosts(userId) {
// //   return getJSON(`/api/users/${userId}/posts`);
// // }
// //
// // Напиши функцию loadUserAndPostsSequential(id), которая:
// // 1. сначала загружает пользователя
// // 2. потом загружает посты
// // 3. возвращает объект { user, posts }

// async function getUser(id) {
// return getJSON(`/api/users/${id}`);
// }

// async function getPosts(userId) {
// return getJSON(`/api/users/${userId}/posts`);
// }

// async function loadUserAndPostsSequential(id) {
// // TODO
// }

// // ------------------------------------------------------
// // Task 7. loadUserAndSettingsParallel
// // ------------------------------------------------------
// //
// // Есть две независимые функции:
// //
// // getUser(id)
// // getSettings(id)
// //
// // Напиши функцию loadUserAndSettingsParallel(id), которая:
// // 1. параллельно загружает user и settings через Promise.all
// // 2. возвращает объект { user, settings }

// async function getSettings(id) {
// return getJSON(`/api/users/${id}/settings`);
// }

// async function loadUserAndSettingsParallel(id) {
// // TODO
// }

// // ======================================================
// // PART 4. Ошибки и retry
// // ======================================================

// // ------------------------------------------------------
// // Task 8. safeGetJSON
// // ------------------------------------------------------
// //
// // Напиши функцию safeGetJSON(url), которая НИКОГДА не кидает ошибку наружу.
// //
// // При успехе возвращает:
// //
// // {
// //   data: ...,
// //   error: null,
// // }
// //
// // При ошибке возвращает:
// //
// // {
// //   data: null,
// //   error: error,
// // }

// async function safeGetJSON(url) {
// // TODO
// }

// // ------------------------------------------------------
// // Task 9. requestWithRetry
// // ------------------------------------------------------
// //
// // Напиши функцию requestWithRetry(url, retries), которая:
// // 1. пытается выполнить getJSON(url)
// // 2. если запрос успешный — возвращает данные
// // 3. если запрос упал — пробует ещё раз
// // 4. всего попыток должно быть retries + 1
// // 5. если все попытки упали — кидает последнюю ошибку
// //
// // Пример:
// // await requestWithRetry('/api/users', 2);
// //
// // Это значит:
// // первая попытка + 2 повтора = всего 3 попытки.

// async function requestWithRetry(url, retries) {
// // TODO
// }

// // ======================================================
// // PART 5. AbortController
// // ======================================================

// // ------------------------------------------------------
// // Task 10. fetchWithTimeout
// // ------------------------------------------------------
// //
// // Напиши функцию fetchWithTimeout(url, timeoutMs), которая отменяет запрос,
// // если он длится дольше timeoutMs.
// //
// // Требования:
// // 1. создать AbortController
// // 2. поставить setTimeout, который вызовет controller.abort()
// // 3. передать signal в fetch
// // 4. в finally очистить таймер через clearTimeout
// // 5. проверить response.ok
// // 6. вернуть response.json()

// async function fetchWithTimeout(url, timeoutMs) {
// // TODO
// }

// // ------------------------------------------------------
// // Task 11. createSearchUsers
// // ------------------------------------------------------
// //
// // Напиши функцию-фабрику createSearchUsers,
// // которая возвращает функцию searchUsers(query).
// //
// // Задача:
// // если пользователь быстро вводит текст,
// // старый запрос должен отменяться перед новым.
// //
// // Требования:
// // 1. внутри createSearchUsers хранить текущий controller
// // 2. при каждом новом поиске отменять предыдущий запрос
// // 3. создавать новый AbortController
// // 4. делать запрос /api/search?q=${encodeURIComponent(query)}
// // 5. если запрос был отменён, возвращать null
// // 6. если другая ошибка — кидать её дальше
// // 7. при успехе возвращать response.json()

// function createSearchUsers() {
// // TODO

// return async function searchUsers(query) {
// // TODO
// };
// }

// // ======================================================
// // PART 6. Универсальная обёртка
// // ======================================================

// // ------------------------------------------------------
// // Task 12. request
// // ------------------------------------------------------
// //
// // Напиши универсальную функцию request(url, options = {}).
// //
// // Требования:
// // 1. сделать fetch(url, options)
// // 2. если response.ok === false, кинуть ошибку со статусом
// // 3. если статус 204, вернуть null
// // 4. иначе вернуть response.json()
// //
// // Потом напиши функции:
// // getUsers()
// // getUserById(id)
// // createUserWithRequest(user)
// // deleteUser(id)

// async function request(url, options = {}) {
// // TODO
// }

// function getUsers() {
// // TODO
// }

// function getUserById(id) {
// // TODO
// }

// function createUserWithRequest(user) {
// // TODO
// }

// function deleteUser(id) {
// // TODO
// }

// // ======================================================
// // ANSWERS
// // ======================================================
// //
// // Ниже ответы. Сначала лучше решить самой.
// // Можно закомментировать задачи выше и раскомментировать ответы,
// // если хочешь запускать файл целиком.

// // ------------------------------------------------------
// // Answer 1. getJSON
// // ------------------------------------------------------

// async function answerGetJSON(url) {
// const response = await fetch(url);

// if (!response.ok) {
// throw new Error(`HTTP error: ${response.status}`);
// }

// return response.json();
// }

// // ------------------------------------------------------
// // Answer 2. getText
// // ------------------------------------------------------

// async function answerGetText(url) {
// const response = await fetch(url);

// if (!response.ok) {
// throw new Error(`HTTP error: ${response.status}`);
// }

// return response.text();
// }

// // ------------------------------------------------------
// // Answer 3. createUser
// // ------------------------------------------------------

// async function answerCreateUser(user) {
// const response = await fetch('/api/users', {
// method: 'POST',
// headers: {
// 'Content-Type': 'application/json',
// },
// body: JSON.stringify(user),
// });

// if (!response.ok) {
// throw new Error(`HTTP error: ${response.status}`);
// }

// return response.json();
// }

// // ------------------------------------------------------
// // Answer 4. loadUser
// // ------------------------------------------------------

// const answerUserState = {
// loading: false,
// data: null,
// error: null,
// };

// async function answerLoadUser(id) {
// answerUserState.loading = true;
// answerUserState.data = null;
// answerUserState.error = null;

// try {
// const response = await fetch(`/api/users/${id}`);

// ```
// if (!response.ok) {
//   throw new Error(`HTTP error: ${response.status}`);
// }

// answerUserState.data = await response.json();
// ```

// } catch (error) {
// answerUserState.error = error;
// } finally {
// answerUserState.loading = false;
// }
// }

// // ------------------------------------------------------
// // Answer 5. loadUsers
// // ------------------------------------------------------

// const answerUsersState = {
// loading: false,
// users: [],
// error: null,
// };

// async function answerLoadUsers() {
// answerUsersState.loading = true;
// answerUsersState.users = [];
// answerUsersState.error = null;

// try {
// const response = await fetch('/api/users');

// ```
// if (!response.ok) {
//   throw new Error(`HTTP error: ${response.status}`);
// }

// answerUsersState.users = await response.json();
// ```

// } catch (error) {
// answerUsersState.error = error;
// } finally {
// answerUsersState.loading = false;
// }
// }

// // ------------------------------------------------------
// // Answer 6. loadUserAndPostsSequential
// // ------------------------------------------------------

// async function answerLoadUserAndPostsSequential(id) {
// const user = await getUser(id);
// const posts = await getPosts(id);

// return {
// user,
// posts,
// };
// }

// // ------------------------------------------------------
// // Answer 7. loadUserAndSettingsParallel
// // ------------------------------------------------------

// async function answerLoadUserAndSettingsParallel(id) {
// const [user, settings] = await Promise.all([
// getUser(id),
// getSettings(id),
// ]);

// return {
// user,
// settings,
// };
// }

// // ------------------------------------------------------
// // Answer 8. safeGetJSON
// // ------------------------------------------------------

// async function answerSafeGetJSON(url) {
// try {
// const data = await getJSON(url);

// ```
// return {
//   data,
//   error: null,
// };
// ```

// } catch (error) {
// return {
// data: null,
// error,
// };
// }
// }

// // ------------------------------------------------------
// // Answer 9. requestWithRetry
// // ------------------------------------------------------

// async function answerRequestWithRetry(url, retries) {
// let lastError;

// for (let attempt = 0; attempt <= retries; attempt++) {
// try {
// return await getJSON(url);
// } catch (error) {
// lastError = error;
// }
// }

// throw lastError;
// }

// // ------------------------------------------------------
// // Answer 10. fetchWithTimeout
// // ------------------------------------------------------

// async function answerFetchWithTimeout(url, timeoutMs) {
// const controller = new AbortController();

// const timerId = setTimeout(() => {
// controller.abort();
// }, timeoutMs);

// try {
// const response = await fetch(url, {
// signal: controller.signal,
// });

// ```
// if (!response.ok) {
//   throw new Error(`HTTP error: ${response.status}`);
// }

// return await response.json();
// ```

// } finally {
// clearTimeout(timerId);
// }
// }

// // ------------------------------------------------------
// // Answer 11. createSearchUsers
// // ------------------------------------------------------

// function answerCreateSearchUsers() {
// let controller = null;

// return async function searchUsers(query) {
// if (controller) {
// controller.abort();
// }

// ```
// controller = new AbortController();

// try {
//   const response = await fetch(
//     `/api/search?q=${encodeURIComponent(query)}`,
//     {
//       signal: controller.signal,
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`HTTP error: ${response.status}`);
//   }

//   return await response.json();
// } catch (error) {
//   if (error.name === 'AbortError') {
//     return null;
//   }

//   throw error;
// }
// ```

// };
// }

// // ------------------------------------------------------
// // Answer 12. request
// // ------------------------------------------------------

// async function answerRequest(url, options = {}) {
// const response = await fetch(url, options);

// if (!response.ok) {
// throw new Error(`HTTP error: ${response.status}`);
// }

// if (response.status === 204) {
// return null;
// }

// return response.json();
// }

// function answerGetUsers() {
// return answerRequest('/api/users');
// }

// function answerGetUserById(id) {
// return answerRequest(`/api/users/${id}`);
// }

// function answerCreateUserWithRequest(user) {
// return answerRequest('/api/users', {
// method: 'POST',
// headers: {
// 'Content-Type': 'application/json',
// },
// body: JSON.stringify(user),
// });
// }

// function answerDeleteUser(id) {
// return answerRequest(`/api/users/${id}`, {
// method: 'DELETE',
// });
// }
