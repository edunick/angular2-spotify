"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/Rx');
var SpotifyService = (function () {
    function SpotifyService(config, http) {
        this.config = config;
        this.http = http;
        config.apiBase = 'https://api.spotify.com/v1';
    }
    //#region albums
    /**
  * Gets an album
  * Pass in album id or spotify uri
  */
    SpotifyService.prototype.getAlbum = function (album) {
        album = this.getIdFromUri(album);
        return this.api({
            method: 'get',
            url: "/albums/" + album
        }).map(function (res) { return res.json(); });
    };
    /**
  * Gets albums
  * Pass in comma separated string or array of album ids
  */
    SpotifyService.prototype.getAlbums = function (albums) {
        var albumList = this.mountItemList(albums);
        return this.api({
            method: 'get',
            url: "/albums",
            search: { ids: albumList.toString() }
        }).map(function (res) { return res.json(); });
    };
    /**
  * Get Album Tracks
  * Pass in album id or spotify uri
  */
    SpotifyService.prototype.getAlbumTracks = function (album, options) {
        album = this.getIdFromUri(album);
        return this.api({
            method: 'get',
            url: "/albums/" + album + "/tracks",
            search: options
        }).map(function (res) { return res.json(); });
    };
    //#endregion
    //#region artists
    /**
  * Get an Artist
  */
    SpotifyService.prototype.getArtist = function (artist) {
        artist = this.getIdFromUri(artist);
        return this.api({
            method: 'get',
            url: "/artists/" + artist
        }).map(function (res) { return res.json(); });
    };
    /**
  * Get multiple artists
  */
    SpotifyService.prototype.getArtists = function (artists) {
        var artistList = this.mountItemList(artists);
        return this.api({
            method: 'get',
            url: "/artists/",
            search: { ids: artists.toString() }
        }).map(function (res) { return res.json(); });
    };
    //Artist Albums
    SpotifyService.prototype.getArtistAlbums = function (artist, options) {
        artist = this.getIdFromUri(artist);
        return this.api({
            method: 'get',
            url: "/artists/" + artist + "/albums",
            search: options
        }).map(function (res) { return res.json(); });
    };
    /**
     * Get Artist Top Tracks
     * The country: an ISO 3166-1 alpha-2 country code.
     */
    SpotifyService.prototype.getArtistTopTracks = function (artist, country) {
        artist = this.getIdFromUri(artist);
        return this.api({
            method: 'get',
            url: "/artists/" + artist + "/top-tracks",
            search: { country: country }
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.getRelatedArtists = function (artist) {
        artist = this.getIdFromUri(artist);
        return this.api({
            method: 'get',
            url: "/artists/" + artist + "/related-artists"
        }).map(function (res) { return res.json(); });
    };
    //#endregion
    //#region browse
    SpotifyService.prototype.getFeaturedPlaylists = function (options) {
        return this.api({
            method: 'get',
            url: "/browse/featured-playlists",
            search: options,
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.getNewReleases = function (options) {
        return this.api({
            method: 'get',
            url: "/browse/new-releases",
            search: options,
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.getCategories = function (options) {
        return this.api({
            method: 'get',
            url: "/browse/categories",
            search: options,
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.getCategory = function (categoryId, options) {
        return this.api({
            method: 'get',
            url: "/browse/categories/" + categoryId,
            search: options,
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.getCategoryPlaylists = function (categoryId, options) {
        return this.api({
            method: 'get',
            url: "/browse/categories/" + categoryId + "/playlists",
            search: options,
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.getRecommendations = function (options) {
        return this.api({
            method: 'get',
            url: "/recommendations",
            search: options,
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.getAvailableGenreSeeds = function () {
        return this.api({
            method: 'get',
            url: "/recommendations/available-genre-seeds",
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    //#endregion
    //#region following
    SpotifyService.prototype.following = function (type, options) {
        options = options || {};
        options.type = type;
        return this.api({
            method: 'get',
            url: "/me/following",
            search: options,
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.follow = function (type, ids) {
        return this.api({
            method: 'put',
            url: "/me/following",
            search: { type: type, ids: ids.toString() },
            headers: this.getHeaders()
        });
    };
    SpotifyService.prototype.unfollow = function (type, ids) {
        return this.api({
            method: 'delete',
            url: "/me/following",
            search: { type: type, ids: ids.toString() },
            headers: this.getHeaders()
        });
    };
    SpotifyService.prototype.userFollowingContains = function (type, ids) {
        return this.api({
            method: 'get',
            url: "/me/following/contains",
            search: { type: type, ids: ids.toString() },
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.followPlaylist = function (userId, playlistId, isPublic) {
        return this.api({
            method: 'put',
            url: "/users/" + userId + "/playlists/" + playlistId + "/followers",
            body: { public: !!isPublic },
            headers: this.getHeaders(true)
        });
    };
    SpotifyService.prototype.unfollowPlaylist = function (userId, playlistId) {
        return this.api({
            method: 'delete',
            url: "/users/" + userId + "/playlists/" + playlistId + "/followers",
            headers: this.getHeaders()
        });
    };
    SpotifyService.prototype.playlistFollowingContains = function (userId, playlistId, ids) {
        return this.api({
            method: 'get',
            url: "/users/" + userId + "/playlists/" + playlistId + "/followers/contains",
            search: { ids: ids.toString() },
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    //#endregion
    //#region library
    SpotifyService.prototype.getSavedUserTracks = function (options) {
        return this.api({
            method: 'get',
            url: "/me/tracks",
            headers: this.getHeaders(),
            search: options
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.userTracksContains = function (tracks) {
        var trackList = this.mountItemList(tracks);
        return this.api({
            method: 'get',
            url: "/me/tracks/contains",
            headers: this.getHeaders(),
            search: { ids: trackList.toString() }
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.saveUserTracks = function (tracks) {
        var trackList = this.mountItemList(tracks);
        return this.api({
            method: 'put',
            url: "/me/tracks",
            headers: this.getHeaders(),
            search: { ids: trackList.toString() }
        });
    };
    SpotifyService.prototype.removeUserTracks = function (tracks) {
        var trackList = this.mountItemList(tracks);
        return this.api({
            method: 'delete',
            url: "/me/tracks",
            headers: this.getHeaders(),
            search: { ids: trackList.toString() }
        });
    };
    SpotifyService.prototype.getSavedUserAlbums = function (options) {
        return this.api({
            method: 'get',
            url: "/me/albums",
            headers: this.getHeaders(),
            search: options
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.saveUserAlbums = function (albums) {
        var albumList = this.mountItemList(albums);
        return this.api({
            method: 'put',
            url: "/me/albums",
            headers: this.getHeaders(),
            search: { ids: albumList.toString() }
        });
    };
    SpotifyService.prototype.removeUserAlbums = function (albums) {
        var albumList = this.mountItemList(albums);
        return this.api({
            method: 'delete',
            url: "/me/albums",
            headers: this.getHeaders(),
            search: { ids: albumList.toString() }
        });
    };
    SpotifyService.prototype.userAlbumsContains = function (albums) {
        var albumList = this.mountItemList(albums);
        return this.api({
            method: 'get',
            url: "/me/albums/contains",
            headers: this.getHeaders(),
            search: { ids: albumList.toString() }
        }).map(function (res) { return res.json(); });
    };
    //#endregion
    //#region personalization
    SpotifyService.prototype.getUserTopArtists = function (options) {
        return this.api({
            method: 'get',
            url: "/me/top/artists",
            search: options,
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.getUserTopTracks = function (options) {
        return this.api({
            method: 'get',
            url: "/me/top/tracks",
            search: options,
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.getUserRecentlyPlayed = function (options) {
        return this.api({
            method: 'get',
            url: "/me/player/recently-played",
            search: options,
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    //#endregion
    //#region playlists
    SpotifyService.prototype.getUserPlaylists = function (userId, options) {
        return this.api({
            method: 'get',
            url: "/users/" + userId + "/playlists",
            headers: this.getHeaders(),
            search: options
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.getCurrentUserPlaylists = function (options) {
        return this.api({
            method: 'get',
            url: "/me/playlists/",
            search: options,
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.getPlaylist = function (userId, playlistId, options) {
        return this.api({
            method: 'get',
            url: "/users/" + userId + "/playlists/" + playlistId,
            headers: this.getHeaders(),
            search: options
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.getPlaylistTracks = function (userId, playlistId, options) {
        return this.api({
            method: 'get',
            url: "/users/" + userId + "/playlists/" + playlistId + "/tracks",
            headers: this.getHeaders(),
            search: options
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.createPlaylist = function (userId, options) {
        return this.api({
            method: 'post',
            url: "/users/" + userId + "/playlists",
            headers: this.getHeaders(true),
            body: options
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.addPlaylistTracks = function (userId, playlistId, tracks, options) {
        var trackList = Array.isArray(tracks) ? tracks : tracks.split(',');
        trackList.forEach(function (value, index) {
            trackList[index] = value.indexOf('spotify:') === -1 ? 'spotify:track:' + value : value;
        });
        var search = { uris: trackList.toString() };
        if (!!options)
            search['position'] = options.position;
        return this.api({
            method: 'post',
            url: "/users/" + userId + "/playlists/" + playlistId + "/tracks",
            headers: this.getHeaders(true),
            search: search
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.removePlaylistTracks = function (userId, playlistId, tracks) {
        var trackList = Array.isArray(tracks) ? tracks : tracks.split(',');
        var trackUris = [];
        trackList.forEach(function (value, index) {
            trackUris[index] = {
                uri: value.indexOf('spotify:') === -1 ? 'spotify:track:' + value : value
            };
        });
        return this.api({
            method: 'delete',
            url: "/users/" + userId + "/playlists/" + playlistId + "/tracks",
            headers: this.getHeaders(true),
            body: { tracks: trackUris }
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.reorderPlaylistTracks = function (userId, playlistId, options) {
        return this.api({
            method: 'put',
            url: "/users/" + userId + "/playlists/" + playlistId + "/tracks",
            headers: this.getHeaders(true),
            body: options
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.replacePlaylistTracks = function (userId, playlistId, tracks) {
        var trackList = Array.isArray(tracks) ? tracks : tracks.split(',');
        trackList.forEach(function (value, index) {
            trackList[index] = value.indexOf('spotify:') === -1 ? 'spotify:track:' + value : value;
        });
        return this.api({
            method: 'put',
            url: "/users/" + userId + "/playlists/" + playlistId + "/tracks",
            headers: this.getHeaders(),
            search: { uris: trackList.toString() }
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.updatePlaylistDetails = function (userId, playlistId, options) {
        return this.api({
            method: 'put',
            url: "/users/" + userId + "/playlists/" + playlistId,
            headers: this.getHeaders(true),
            body: options
        });
    };
    //#endregion
    //#region profiles
    SpotifyService.prototype.getUser = function (userId) {
        return this.api({
            method: 'get',
            url: "/users/" + userId
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.getCurrentUser = function () {
        return this.api({
            method: 'get',
            url: "/me",
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    //#endregion
    //#region search
    /**
  * Search Spotify
  * q = search query
  * type = artist, album or track
  */
    SpotifyService.prototype.search = function (q, type, options) {
        options = options || {};
        options.q = q;
        options.type = type;
        return this.api({
            method: 'get',
            url: "/search",
            search: options,
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    //#endregion
    //#region tracks
    SpotifyService.prototype.getTrack = function (track) {
        track = this.getIdFromUri(track);
        return this.api({
            method: 'get',
            url: "/tracks/" + track
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.getTracks = function (tracks) {
        var trackList = this.mountItemList(tracks);
        return this.api({
            method: 'get',
            url: "/tracks/",
            search: { ids: trackList.toString() }
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.getTrackAudioAnalysis = function (track) {
        track = this.getIdFromUri(track);
        return this.api({
            method: 'get',
            url: "/audio-analysis/" + track,
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.getTrackAudioFeatures = function (track) {
        track = this.getIdFromUri(track);
        return this.api({
            method: 'get',
            url: "/audio-features/" + track,
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    SpotifyService.prototype.getTracksAudioFeatures = function (tracks) {
        var trackList = this.mountItemList(tracks);
        return this.api({
            method: 'get',
            url: "/audio-features/",
            search: { ids: trackList.toString() },
            headers: this.getHeaders()
        }).map(function (res) { return res.json(); });
    };
    //#endregion
    //#region login
    SpotifyService.prototype.login = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var w = 400, h = 500, left = (screen.width / 2) - (w / 2), top = (screen.height / 2) - (h / 2);
            var params = {
                client_id: _this.config.clientId,
                redirect_uri: _this.config.redirectUri,
                scope: _this.config.scope || '',
                response_type: 'token'
            };
            var authCompleted = false;
            var authWindow = _this.openDialog('https://accounts.spotify.com/authorize?' + _this.toQueryString(params), 'Spotify', 'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left, function () {
                if (!authCompleted) {
                    return reject('Login rejected error');
                }
            });
            var storageChanged = function (e) {
                if (e.key === 'angular2-spotify-token') {
                    if (authWindow) {
                        authWindow.close();
                    }
                    authCompleted = true;
                    _this.config.authToken = e.newValue;
                    window.removeEventListener('storage', storageChanged, false);
                    return resolve(e.newValue);
                }
            };
            window.addEventListener('storage', storageChanged, false);
        });
        return Observable_1.Observable.fromPromise(promise).catch(this.handleError);
    };
    //#endregion
    //#region utils
    SpotifyService.prototype.toQueryString = function (obj) {
        var parts = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
            }
        }
        ;
        return parts.join('&');
    };
    ;
    SpotifyService.prototype.openDialog = function (uri, name, options, cb) {
        var win = window.open(uri, name, options);
        var interval = window.setInterval(function () {
            try {
                if (!win || win.closed) {
                    window.clearInterval(interval);
                    cb(win);
                }
            }
            catch (e) { }
        }, 1000000);
        return win;
    };
    SpotifyService.prototype.auth = function (isJson) {
        var auth = {
            'Authorization': 'Bearer ' + this.config.authToken
        };
        if (isJson) {
            auth['Content-Type'] = 'application/json';
        }
        return auth;
    };
    SpotifyService.prototype.getHeaders = function (isJson) {
        return new http_1.Headers(this.auth(isJson));
    };
    SpotifyService.prototype.getIdFromUri = function (uri) {
        return uri.indexOf('spotify:') === -1 ? uri : uri.split(':')[2];
    };
    SpotifyService.prototype.mountItemList = function (items) {
        var _this = this;
        var itemList = Array.isArray(items) ? items : items.split(',');
        itemList.forEach(function (value, index) {
            itemList[index] = _this.getIdFromUri(value);
        });
        return itemList;
    };
    SpotifyService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    SpotifyService.prototype.api = function (requestOptions) {
        return this.http.request(new http_1.Request({
            url: this.config.apiBase + requestOptions.url,
            method: requestOptions.method || 'get',
            search: this.toQueryString(requestOptions.search),
            body: JSON.stringify(requestOptions.body),
            headers: requestOptions.headers
        }));
    };
    SpotifyService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject("SpotifyConfig")), 
        __metadata('design:paramtypes', [Object, http_1.Http])
    ], SpotifyService);
    return SpotifyService;
}());
exports.SpotifyService = SpotifyService;
//# sourceMappingURL=angular2-spotify.js.map