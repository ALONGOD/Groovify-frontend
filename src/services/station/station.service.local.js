
import { storageService } from '../async-storage.service';
import { makeId } from '../util.service';
import { userService } from '../user';
import { stations as demoStations, user as demoUser } from '../../../demo_data/station.js';

const STORAGE_KEY = 'station';

export const stationService = {
    query,
    getById,
    save,
    remove,
    addStationMsg,
    initializeDemoData,  // Add this method
};

window.cs = stationService;

initializeDemoData(); // Call this function on initialization

async function initializeDemoData() {
    let stations = await storageService.query(STORAGE_KEY);
    if (!stations || !stations.length) {
        stations = demoStations;
        await storageService.post(STORAGE_KEY, stations);
        console.log('Demo stations initialized in local storage.');
    }
}

async function query(filterBy = { txt: '', price: 0 }) {
    var stations = await storageService.query(STORAGE_KEY);
    const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy;

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i');
        stations = stations.filter(station => regex.test(station.vendor) || regex.test(station.description));
    }
    if (minSpeed) {
        stations = stations.filter(station => station.speed >= minSpeed);
    }
    if (sortField === 'vendor' || sortField === 'owner') {
        stations.sort((station1, station2) =>
            station1[sortField].localeCompare(station2[sortField]) * +sortDir);
    }
    if (sortField === 'price' || sortField === 'speed') {
        stations.sort((station1, station2) =>
            (station1[sortField] - station2[sortField]) * +sortDir);
    }

    stations = stations.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }));
    return stations;
}

function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId);
}

async function remove(stationId) {
    await storageService.remove(STORAGE_KEY, stationId);
}

async function save(station) {
    var savedStation;
    if (station._id) {
        const stationToSave = {
            _id: station._id,
            price: station.price,
            speed: station.speed,
        };
        savedStation = await storageService.put(STORAGE_KEY, stationToSave);
    } else {
        const stationToSave = {
            vendor: station.vendor,
            price: station.price,
            speed: station.speed,
            owner: userService.getLoggedinUser(),
            msgs: []
        };
        savedStation = await storageService.post(STORAGE_KEY, stationToSave);
    }
    return savedStation;
}

async function addStationMsg(stationId, txt) {
    const station = await getById(stationId);
    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    };
    station.msgs.push(msg);
    await storageService.put(STORAGE_KEY, station);

    return msg;
}
