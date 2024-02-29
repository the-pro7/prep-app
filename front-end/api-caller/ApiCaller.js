class ApiCaller {
  constructor(url, fetchOptions) {
    this.url = url;
    this.fetchOptions = fetchOptions;
  }

  async fetchEndpoint(url) {
    try {
      let response = await fetch(url, this.fetchOptions);

      if (!response.ok) {
        throw new Error(
          `something prevented your success  ${response.statusText}`
        );
      }

      let data = await response.json();
      return data;
    } catch (error) {
      console.log("An error occurred " + error);
      throw error;
    }
  }

  async get(endpoint) {

  }
}
