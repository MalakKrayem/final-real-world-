import EventService from "@/services/EventService.js";

export const namespaced = true;

export const state = {
  events: [],
  event: {},
  eventsTotal: 0,
  perPage: 3,
};

export const mutations = {
  ADD_Event(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
};

export const actions = {
  createEvents({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_Event", event);
        const notification = {
          type: "success",
          message: "Your event has been created!",
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a creating proplem: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },

  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then((response) => {
        commit("SET_EVENTS", response.data);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a fetching events proplem: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvent({ commit, getters, state }, id) {
    if (id === state.event.id) {
      return state.event;
    }
    var event = getters.getEventId(id);
    if (event) {
      commit("SET_EVENT", event);
      return event;
    } else {
      return EventService.getEvent(id).then((response) => {
        commit("SET_EVENT", response.data);
        return response.data;
      });
      //        .catch((error) => {
      //        const notification = {
      //        type: "error",
      //      message: "There was a fetching event proplem: " + error.message,
      //  };
      //  dispatch("notification/add", notification, { root: true });
      //  });
    }
  },
};

export const getters = {
  getEventId: (state) => (id) => {
    return state.events.find((event) => event.id === id);
  },
};
