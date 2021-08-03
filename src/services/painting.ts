import { db } from 'utils/firebase';

export function createPainting(projectName: string, canvasType: string, dimension: string): string {
  const dbRef = db.collection('Painting-draft');
  let docID = '';
  dbRef
    .where('NameOfProject', '==', projectName)
    .get()
    .then((querysnapshot) => {
      if (querysnapshot.docs.length > 0) {
        console.log('project already exists');
      } else {
        dbRef
          .add({
            NameOfProject: projectName,
            CanvasType: canvasType,
            Dimension: dimension
          })
          .then((doc) => {
            docID = doc.id;
          });
      }
    });
  return docID;
}

export async function getDraftPainting(draftId: string, userId: string): Promise<null | any> {
  const dbRef = db.collection('Painting-draft').doc(draftId);
  const doc = await dbRef.get();
  const data = doc.data();
  if (data) {
    return data;
  }
  return null;
}
