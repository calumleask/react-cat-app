import qs from "qs";

class QueryStringParser {

  private _parseHash(): qs.ParsedQs {
    const splitHash = location.hash.split("?");
    const hashSearch = splitHash.length > 1 ? splitHash[1] : null;
    return qs.parse(hashSearch, { ignoreQueryPrefix: true });
  }

  private _parse(): qs.ParsedQs {
    const search = location.search;
    return qs.parse(search, { ignoreQueryPrefix: true });
  }

  get(key: string): string {
    const hashParams = this._parseHash();
    if (key in hashParams) {
      return hashParams[key] as string;
    }
    const params = this._parse();
    if (key in params) {
      return params[key] as string;
    }
    return null;
  }

  has(key: string): boolean {
    const hashParams = this._parseHash();
    if (key in hashParams) {
      return true;
    }
    const params = this._parse();
    return (key in params);
  }
}

const queryStringParser: QueryStringParser = new QueryStringParser();
export default queryStringParser;
