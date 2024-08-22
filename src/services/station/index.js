const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { stationService as local } from './station.service.local'
import { stationService as remote } from './station.service.remote'

export function getEmptyStation() {
    return {
        _id: makeId(),
        name: 'New Playlist',
        imgUrl: 'https://via.placeholder.com/150', // Default placeholder image
        tags: [], // You can add default tags if needed
        createdBy: null, // No user data since there's no logged-in user
        likedByUsers: [],
        songs: [],
    }
}



function getDefaultFilter() {
    return {
        txt: '',
        minSpeed: '',
        sortField: '',
        sortDir: '',
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const stationService = { getEmptyStation, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.stationService = stationService
