import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
export interface SpotifyConfig {
    clientId: string;
    redirectUri: string;
    scope: string;
    authToken?: string;
    apiBase: string;
}
export interface SpotifyOptions {
    limit?: number;
    offset?: number;
    market?: string;
    album_type?: string;
    country?: string;
    type?: string;
    q?: string;
    timestamp?: string;
    locale?: string;
    public?: boolean;
    name?: string;
    time_range?: string;
    after?: string;
    before?: string;
}
export declare class SpotifyService {
    private config;
    private http;
    constructor(config: SpotifyConfig, http: Http);
    /**
  * Gets an album
  * Pass in album id or spotify uri
  */
    getAlbum(album: string): Observable<any>;
    /**
  * Gets albums
  * Pass in comma separated string or array of album ids
  */
    getAlbums(albums: string | Array<string>): Observable<any>;
    /**
  * Get Album Tracks
  * Pass in album id or spotify uri
  */
    getAlbumTracks(album: string, options?: SpotifyOptions): Observable<any>;
    /**
  * Get an Artist
  */
    getArtist(artist: string): Observable<any>;
    /**
  * Get multiple artists
  */
    getArtists(artists: string | Array<string>): Observable<any>;
    getArtistAlbums(artist: string, options?: SpotifyOptions): Observable<any>;
    /**
     * Get Artist Top Tracks
     * The country: an ISO 3166-1 alpha-2 country code.
     */
    getArtistTopTracks(artist: string, country: string): Observable<any>;
    getRelatedArtists(artist: string): Observable<any>;
    getFeaturedPlaylists(options?: SpotifyOptions): Observable<any>;
    getNewReleases(options?: SpotifyOptions): Observable<any>;
    getCategories(options?: SpotifyOptions): Observable<any>;
    getCategory(categoryId: string, options?: SpotifyOptions): Observable<any>;
    getCategoryPlaylists(categoryId: string, options?: SpotifyOptions): Observable<any>;
    getRecommendations(options?: SpotifyOptions): Observable<any>;
    getAvailableGenreSeeds(): Observable<any>;
    following(type: string, options?: SpotifyOptions): Observable<any>;
    follow(type: string, ids: string | Array<string>): Observable<Response>;
    unfollow(type: string, ids: string | Array<string>): Observable<Response>;
    userFollowingContains(type: string, ids: string | Array<string>): Observable<any>;
    followPlaylist(userId: string, playlistId: string, isPublic?: boolean): Observable<Response>;
    unfollowPlaylist(userId: string, playlistId: string): Observable<Response>;
    playlistFollowingContains(userId: string, playlistId: string, ids: string | Array<string>): Observable<any>;
    getSavedUserTracks(options?: SpotifyOptions): Observable<any>;
    userTracksContains(tracks: string | Array<string>): Observable<any>;
    saveUserTracks(tracks: string | Array<string>): Observable<Response>;
    removeUserTracks(tracks: string | Array<string>): Observable<Response>;
    getSavedUserAlbums(options?: SpotifyOptions): Observable<any>;
    saveUserAlbums(albums: string | Array<string>): Observable<Response>;
    removeUserAlbums(albums: string | Array<string>): Observable<Response>;
    userAlbumsContains(albums: string | Array<string>): Observable<any>;
    getUserTopArtists(options?: SpotifyOptions): Observable<any>;
    getUserTopTracks(options?: SpotifyOptions): Observable<any>;
    getUserRecentlyPlayed(options?: SpotifyOptions): Observable<any>;
    getUserPlaylists(userId: string, options?: SpotifyOptions): Observable<any>;
    getCurrentUserPlaylists(options?: SpotifyOptions): Observable<any>;
    getPlaylist(userId: string, playlistId: string, options?: {
        fields: string;
    }): Observable<any>;
    getPlaylistTracks(userId: string, playlistId: string, options?: SpotifyOptions): Observable<any>;
    createPlaylist(userId: string, options: {
        name: string;
        public?: boolean;
    }): Observable<any>;
    addPlaylistTracks(userId: string, playlistId: string, tracks: string | Array<string>, options?: {
        position: number;
    }): Observable<any>;
    removePlaylistTracks(userId: string, playlistId: string, tracks: string | Array<string>): Observable<any>;
    reorderPlaylistTracks(userId: string, playlistId: string, options: {
        range_start: number;
        range_length?: number;
        insert_before: number;
        snapshot_id?: string;
    }): Observable<any>;
    replacePlaylistTracks(userId: string, playlistId: string, tracks: string | Array<string>): Observable<any>;
    updatePlaylistDetails(userId: string, playlistId: string, options: Object): Observable<Response>;
    getUser(userId: string): Observable<any>;
    getCurrentUser(): Observable<any>;
    /**
  * Search Spotify
  * q = search query
  * type = artist, album or track
  */
    search(q: string, type: string, options?: SpotifyOptions): Observable<any>;
    getTrack(track: string): Observable<any>;
    getTracks(tracks: string | Array<string>): Observable<any>;
    getTrackAudioAnalysis(track: string): Observable<any>;
    getTrackAudioFeatures(track: string): Observable<any>;
    getTracksAudioFeatures(tracks: string | Array<string>): Observable<any>;
    login(): Observable<any>;
    private toQueryString(obj);
    private openDialog(uri, name, options, cb);
    private auth(isJson?);
    private getHeaders(isJson?);
    private getIdFromUri(uri);
    private mountItemList(items);
    private handleError(error);
    private api(requestOptions);
}
