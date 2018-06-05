const html = require("choo/html");

module.exports = (state, prev, send) => {
  const isWagonsEmpty = state.yard.wagons.length === 0;
  const isLocomotivesEmpty = state.yard.locomotives.length === 0;
  let selectedTrack = false;
  let isSelectedTrackFull = true;
  let isSelectedTrackReady = false;
  let selectedTrackQueueLength = 0;
  if (state.yard.selectedTrack !== false) {
    selectedTrack = state.yard.tracks[state.yard.selectedTrack];
    selectedTrackQueueLength = selectedTrack.queue.length;
    isSelectedTrackFull = selectedTrackQueueLength === selectedTrack.size + 1;
    isSelectedTrackReady = selectedTrack.queue.length > 1;
  }

  return html`
  <form>
    <h2>Interlock</h2>
    <div class="form-group">
      <label for="select-track">Example select</label>
      <select id="select-track" class="form-control" onchange=${el =>
        send("yard:selectTrack", el)}>
        ${
          !state.yard.tracks || state.yard.tracks.length === 0
            ? html`<option selected disabled value="">No tracks available</option>`
            : state.yard.tracks.map(
                (t, idx) =>
                  html`<option value="${idx}" ${
                    state.yard.selectedTrack === idx ? "selected" : ""
                  }>Track ${idx + 1}</button>`
              )
        }
      </select>
    </div>
    <button ${
      isSelectedTrackFull ||
      isWagonsEmpty ||
      (isLocomotivesEmpty && selectedTrackQueueLength)
        ? "disabled"
        : ""
    } onclick=${() =>
    send(
      "yard:moveWagon"
    )} class="btn btn-danger" type="button">Move Wagon <small>(to Track ${state
    .yard.selectedTrack + 1})</small></button>
    
    <button ${!isSelectedTrackReady ? "disabled" : ""} onclick=${() =>
    send(
      "yard:scheduleTrack"
    )} class="btn btn-primary" type="button">Schedule <small>(Track ${state.yard
    .selectedTrack + 1})</small></button>
    <button onclick=${() =>
      send(
        "yard:refill"
      )} class="btn btn-success" type="button">Refill Wagon Pool</button>
    ${
      isWagonsEmpty
        ? html`<p class="text-muted">No more wagons left. Please refill!</p>`
        : null
    }
    ${
      isLocomotivesEmpty
        ? html`<p class="text-muted">No more locomotives left. Work done for today!</p>`
        : null
    }
  </form>`;
};
