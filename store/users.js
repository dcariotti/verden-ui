export const state = () => ({
  users: [],
});

export const getters = {
  users: (state) => {
    return state.users;
  },
};

export const mutations = {
  saveUsers: (state, value) => {
    state.users = value;
  },
};

export const actions = {
  // Search user by `id`
  async findById({ commit }, id) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        res.status = response.status;
        res.data = await response.json();
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
  // Search user models
  async findModels({ commit }, id) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/users/${id}/models`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        res.status = response.status;
        res.data = await response.json();
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
  // Edit an user
  async editUser({ commit, rootGetters }, payload) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/users/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${rootGetters["auth/accessToken"]}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        res.data = await response.json();
        res.status = response.status;
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
  // Edit avatar
  // FIX: use the right endpoint with `payload.id`, not `me`
  async editAvatar({ commit, rootGetters }, payload) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    const body = new FormData();
    body.append("file", payload.file);

    await fetch(`${api}/v1/users/me/avatar`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${rootGetters["auth/accessToken"]}`,
      },
      body,
    })
      .then(async (response) => {
        res.data = await response.json();
        res.status = response.status;
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
  // Delete the avatar
  // FIX: use the right endpoint with `id`, not `me`
  async deleteAvatar({ commit, rootGetters }, id) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/users/me/avatar`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${rootGetters["auth/accessToken"]}`,
      },
    })
      .then(async (response) => {
        res.status = response.status;
        if (res.status != 200) res.data = await response.json();
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
};
