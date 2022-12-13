import IProject from '@/interfaces/IProject';
export default interface ITaks {
    durationInSeconds: number,
    description: string,
    project: IProject
}