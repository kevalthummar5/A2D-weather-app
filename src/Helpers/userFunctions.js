/**
 * this function is for send form-data to server after
 * proper validation and appropiate responce back.
 * @param   {string} param1 method for fetch api
 * @param   {object} param2 input body object with name
 * and value pair.
 *
 * @return  {object} response of following post request (
 * it may be succesful login or sign up or error message if
 * anything fails.)
 */
export const postData = async (action, bodyObject) => {
  const body = JSON.stringify(bodyObject);
  const url = `https:hiring-test.a2dweb.com/${action}`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Length", `${body.length}`);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: body,
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const errorResponse = await response.text();
      const fetchError = await JSON.parse(errorResponse);

      return { succeed: false, data: fetchError };
    }
    const data = await response.text();
    const fetchData = await JSON.parse(data);

    return { succeed: true, data: fetchData };
  } catch (error) {}
};

/**
 * this function is for get data from server on
 *  following  events and get appropiate responce back.
 * @param   {string} param1 method for fetch api
 * @param   {string} param2 token got after succesful login
 * @return  {object} response of request
 */
export const getData = async (action, token) => {
  const url = `https:hiring-test.a2dweb.com/${action}`;

  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const errorResponse = await response.text();
    }
    const data = await response.text();
    const fetchData = await JSON.parse(data);

    return { succeed: true, data: fetchData };
  } catch (error) {}
};
