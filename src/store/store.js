"use strict";

// Vue和Vuex
import Vue from "vue";
import Vuex from "vuex";
// 使用vuex
Vue.use(Vuex);

import { fetchAjaxData } from "../api/fetch.js";

let mutations = {
    fetchData(state, payload) {
        state.ajaxData = payload;
    },
    setInitData(state,obj){
        state.initData = obj
    }
};

let actions = {
    fetchData(context) {
        fetchAjaxData(context.state.baseargs, function(ajaxData) {
            context.commit("fetchData", ajaxData);
        });
    },
    setInitData({commit},obj){
        commit('setInitData',obj);
    }
};

/**
 * store工厂函数
 * 
 * @export
 * @returns store实例
 */
export function createStore() {
    let storeObj = {
        state: {
            ajaxData: null,
            initData:{}
        },
        getters: {
            ajaxData: state => {
                return state.ajaxData;
            },
            initData: state => {
                return state.initData
            }
        },
        mutations: mutations,
        actions: actions
    };
    // Vuex实例
    let store = new Vuex.Store(storeObj);
    return store;
}
