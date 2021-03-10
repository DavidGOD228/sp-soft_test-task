import React from "react";
import { render, fireEvent, RenderResult, waitFor} from "@testing-library/react";
import {VideoPlayer} from "./index";

describe("Render VideoPlayer", () => {
  it("should render uploader, play/pause button, video and volume ranges and video", () => {
    const { getByTestId } = render(<VideoPlayer
        videoSRC="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"/>);

    expect(getByTestId("video-player-component")).toBeTruthy();
    expect(getByTestId("play-pause-button")).toBeTruthy();
    expect(getByTestId("video-player")).toBeTruthy();
  });
});

describe("VideoPlayer PauseIcon/PlayIcon/VideoPlayer clicks", () => {
    let player: RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement>;

    beforeEach(() => {
        player = render(<VideoPlayer
            videoSRC="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"/>);
    });
    let isButtonClicksPlays = false;
    let isVideoClicksPlays = false;

    beforeEach(async () => await waitFor(() => isButtonClicksPlays && isVideoClicksPlays));

    it("plays", () => {
        const playStub = jest
            .spyOn(window.HTMLVideoElement.prototype, "play")
            .mockImplementation(() => {
                return new Promise<void>((resolve) => {
                    isButtonClicksPlays = true;
                    resolve();
                });
            });

        const playButton = player.getByTestId("play-pause-button");

        fireEvent.click(playButton);

        expect(playStub).toHaveBeenCalled();
    });

    it("pauses", () => {
        const pauseStub = jest
            .spyOn(window.HTMLVideoElement.prototype, "pause")
            .mockImplementation(() => {
            });

        const pauseButton = player.getByTestId("play-pause-button");

        fireEvent.click(pauseButton);

        expect(pauseStub).toHaveBeenCalled();
        isButtonClicksPlays = false;
    });

    it("video-plays", () => {
        const playStub = jest
            .spyOn(window.HTMLVideoElement.prototype, "play")
            .mockImplementation(() => {
                return new Promise<void>((resolve) => {
                    isVideoClicksPlays = true;
                    resolve();
                });
            });

        const playButton = player.getByTestId("video-player");

        fireEvent.click(playButton);

        expect(playStub).toHaveBeenCalled();
    });

    it("video-pauses", () => {
        const pauseStub = jest
            .spyOn(window.HTMLVideoElement.prototype, "pause")
            .mockImplementation(() => {
            });

        const videoElement = player.getByTestId("video-player");

        fireEvent.click(videoElement);

        expect(pauseStub).toHaveBeenCalled();
        isVideoClicksPlays = false;
    });

});