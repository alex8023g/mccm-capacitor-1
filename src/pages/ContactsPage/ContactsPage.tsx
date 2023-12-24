import React, { useEffect, useState } from 'react';
// import styles from './contactspage.css';
import {
  ContactPayload,
  Contacts,
  GetContactResult,
} from '@capacitor-community/contacts';
import { Capacitor } from '@capacitor/core';
import { Button, List, ListItem } from '@mui/material';

export function ContactsPage() {
  const [contacts, setContacts] = useState<ContactPayload[]>([]);

  useEffect(() => {
    console.log(Capacitor.getPlatform(), Capacitor.isPluginAvailable('getContacts'));
    if (['ios', 'android'].includes(Capacitor.getPlatform())) {
      (async () => {
        const projection = {
          // Specify which fields should be retrieved.
          name: true,
          phones: true,
          postalAddresses: true,
        };

        const result = await Contacts.getContacts({
          projection,
        });
        // setContacts(result);
        console.log(result.contacts);
        setContacts(result.contacts);
      })();
    }
  }, []);

  const retrieveListOfContacts = async () => {
    const projection = {
      // Specify which fields should be retrieved.
      name: true,
      phones: true,
      postalAddresses: true,
    };

    const result = await Contacts.getContacts({
      projection,
    });
  };
  return (
    <>
      <h2>Contacts Page2</h2>
      <List>
        {contacts.map((contact, i) => (
          <ListItem>
            {contact['contactId']}+ {i}
          </ListItem>
        ))}
      </List>
      <Button
        onClick={() => {
          console.log('contactsState:', contacts);
        }}
      >
        adf
      </Button>
    </>
  );
}
