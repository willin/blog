import type { Env } from '../env';
import type { GithubProvider } from '../provider/github';

export interface IContentService {
}

export class ContentService implements IContentService {
  #github: GithubProvider;

  constructor(env: Env, github: GithubProvider) {
    this.#github = github;
  }


}
