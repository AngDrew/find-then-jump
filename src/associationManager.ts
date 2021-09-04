import {
  Range,
  TextEditor,
} from 'vscode'

import {Association} from './Association'
import {Match} from './documentScanner'
import {ScannerState} from './documentScanner'

export class AssociationManager {
  private activeAssociations: Map<string, Association>

  constructor() {
    this.activeAssociations = new Map()
  }

  public createAssociation = (
    letter: string, 
    match: Match,
    textEditor: TextEditor
  ) => {
    const {lineIndex, matchStartIndex, matchEndIndex} = match
    
    let selection;
    
    if(scannerState == ScanDirection.Down){
      selection = new Range(lineIndex, matchStartIndex, lineIndex, matchEndIndex + 1)
    } else {
      selection = new Range(lineIndex, matchStartIndex, lineIndex, matchEndIndex)
    }
    const association = new Association(letter, selection, lineIndex, matchStartIndex)
    const {foreground, background} = association.getDecorations()
    const {foregroundRange, backgroundRange} = association.getRanges()

    textEditor.setDecorations(foreground, [foregroundRange])
    textEditor.setDecorations(background, [backgroundRange])
    
    this.activeAssociations.set(letter, association)
  }

  public hasAssociation = (letter: string) => {
    return this.activeAssociations.has(letter)
  }

  public getAssociation = (letter: string): Association | undefined => {
    return this.activeAssociations.get(letter)
  }

  public dispose = () => {
    this.activeAssociations.forEach((association) => association.dispose())
    this.activeAssociations = new Map()
  }
}
