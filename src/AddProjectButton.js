import React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react'

function dialogReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true }
    default:
      throw new Error('Unsupported action...')
  }
}

const AddProjectButton = () => {
  const [state, dispatch] = React.useReducer(dialogReducer, {
    open: false
  })
  const { open } = state

  return (
    <>
      <Button floated='right' onClick={() => dispatch({ type: 'open' })}>
        Add your project
      </Button>

      <Modal
        closeIcon
        size='tiny'
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Header>Add your Open source project</Modal.Header>
        <Modal.Content>
          <p>If you have a meaningful open source project, we would be happy to add it here. Projects hosted on GitHub are preferred, but all open source projects are welcome.</p>
          <p>Just drop us an quick email at (contact at meaningfulcode.org) with the name and link to your project! Thank you.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => dispatch({ type: 'close' })}>
            Cancel
          </Button>
          <Button icon labelPosition='right' as='a' href='mailto:contact+newproject@meaningfulcode.org' positive onClick={() => dispatch({ type: 'close' })}>
            Send us an email!
            <Icon name='mail' />
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default AddProjectButton