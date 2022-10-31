
export function formatDuration(duration: number | string) {
    if (typeof duration === 'string') {
        duration = parseInt(duration, 10);
    }

    if (duration > 60) {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return minutes > 0 ? `${hours}hr${hours > 1 ? 's' : ''} ${minutes}min${minutes > 1 ? 's' : ''}` : `${hours}hrs`;
    }
    return `${duration}min${duration > 1 ? 's' : ''}`;
}