export const openFullscreen = () => {
    if (document.body.requestFullscreen) {
        document.body.requestFullscreen();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error;
    } else if (document.body.webkitRequestFullscreen) { /* Safari */
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error;
        document.body.webkitRequestFullscreen();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error;
    } else if (document.body.msRequestFullscreen) { /* IE11 */
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error;
        document.body.msRequestFullscreen();
    }
}

export const closeFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error;
    } else if (document.webkitExitFullscreen) { /* Safari */
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error;
        document.webkitExitFullscreen();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error;
    } else if (document.msExitFullscreen) { /* IE11 */
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error;
        document.msExitFullscreen();
    }
};
