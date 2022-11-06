export namespace UploadFileErrors {
  export class FileAlreadyExists extends Error {
    constructor(filename: string) {
      super(`File with name "${filename}" already exists`);
    }
  }

  export class UserStorageLimitExceeded extends Error {
    constructor() {
      super('User storage limit exceeded');
    }
  }
}
