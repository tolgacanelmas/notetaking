import Header from './Header'

export default function Layout({ children, handleEditNote, isEditable, handleChangeMode }) {
  return (
    <>
      <Header handleEditNote={handleEditNote} isEditable={isEditable} handleChangeMode={handleChangeMode}/>
      <main>{children}</main>
    </>
  )
}