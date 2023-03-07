    export interface Url {
        title: string;
        url: string;
    }

    export interface OptionalUrl {
        title: string;
        url: string;
    }

    export interface KnowledgeCheck {
        question: string;
        answer: string;
    }

    export interface Topic {
        title: string;
        urls: Url[];
        optionalUrls: OptionalUrl[];
        guidelinesForUrls: string;
        knowledgeCheck: KnowledgeCheck[];
    }

    export interface Path {
        prerequisites: string;
        approver: string;
        title: string;
        description: string;
        duration: string;
        contributors: string;
        topics: Topic[];
    }