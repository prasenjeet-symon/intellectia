import { EventEmitter } from 'events';
import { Events } from '../utils';
import { AddArticleCreatedActivity, AddCommentActivity, AddLikeActivity, AddSaveActivity, AddSuggestedUserToFollow, CreateArticleStory, DistributeArticleStory } from './tasks';

const events = new EventEmitter();

events.on(Events.ARTICLE_CREATED, (_data: any) => {
    // { articleId: number, email: string }
    // email is the email id of logged in user ( article owner )
});

events.on(Events.ARTICLE_PUBLISHED, (data: any) => {
    // { articleId: number, email: string }
    // email is the email id of logged in user ( article owner )
    if (!('email' in data && 'articleId' in data)) return;
    const { email, articleId } = data;
    CreateArticleStory(email, articleId).then(() => {
        console.log('Article story created');
        events.emit(Events.ARTICLE_STORY_CREATED, data);
    });

    AddArticleCreatedActivity(email, articleId).then(() => {
        console.log('Article creation activity added for the logged in user');
    });
});

events.on(Events.ARTICLE_STORY_CREATED, (data: any) => {
    // { articleId: number, email: string }
    // email is the email id of logged in user ( article owner )
    const { email, articleId } = data;
    DistributeArticleStory(email, articleId).then(() => console.log('Article story distributed'));
});

events.on(Events.ARTICLE_LIKED, (data: any) => {
    // { articleId: number, email: string }
    // email is the email id of logged in user ( action creator ) in this case like creator who liked the article ( article id )
    if (!('email' in data && 'articleId' in data)) return;
    const { email, articleId } = data;

    AddSuggestedUserToFollow(email, articleId).then(() => {
        console.log('suggested author added to follow for the logged in user');
    });

    AddLikeActivity(email, articleId).then(() => {
        console.log('like activity added for the logged in user');
    });
});

events.on(Events.ARTICLE_SAVED, (data: any) => {
    // { articleId: number, email: string }
    // email is the email id of logged in user ( action creator ) in this case save creator who saved the article ( article id )
    if (!('email' in data && 'articleId' in data)) return;
    const { email, articleId } = data;

    AddSuggestedUserToFollow(email, articleId).then(() => {
        console.log('suggested author added to follow for the logged in user');
    });

    AddSaveActivity(email, articleId).then(() => {
        console.log('save activity added for the logged in user');
    });
});

events.on(Events.ARTICLE_COMMENTED, (data: any) => {
    // { articleId: number, email: string }
    // email is the email id of logged in user ( action creator ) in this case comment creator who commented the article ( article id )
    if (!('email' in data && 'articleId' in data)) return;
    const { email, articleId } = data;

    AddSuggestedUserToFollow(email, articleId).then(() => {
        console.log('suggested author added to follow for the logged in user');
    });

    AddCommentActivity(email, articleId).then(() => {
        console.log('comment activity added for the logged in user');
    });
});

export default events;
