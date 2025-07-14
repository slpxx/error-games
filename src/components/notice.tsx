import React from "react";

type Contact = {
    label: string;
    email: string;
};

type NoticeProps = {
    contacts: Contact[];
};

export default function Notice({ contacts }: NoticeProps) {
    return (
        <section id="notice" className="min-h-screen flex flex-col justify-center items-center py-20">
            <div className="max-w-4xl w-full px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-12">NOTICE</h2>

                <div className="space-y-10 mb-16">
                    {contacts.map((contact, i) => (
                        <div key={i}>
                            <h3 className="text-xl font-semibold mb-2">{contact.label}</h3>
                            <a
                                href={`mailto:${contact.email}`}
                                className="text-lg"
                            >
                                {contact.email}
                            </a>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
