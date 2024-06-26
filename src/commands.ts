import * as vscode from "vscode";
import * as editor from "./utils/editor";
import type CodeFleaManager from "./CodeFleaManager";
import { collapseSelections } from "./utils/selectionsAndRanges";
import { Direction } from "./common";

type ExtensionCommand = {
    id: string;
    execute: (manager: CodeFleaManager, ...args: any[]) => Promise<void>;
};

export const registeredCommands: ExtensionCommand[] = [
    {
        id: "codeFlea.swapSubjectUp",
        execute: async (manager) => {
            await manager.executeSubjectCommand("swapWithObjectAbove");
        },
    },
    {
        id: "codeFlea.swapSubjectDown",
        execute: async (manager) => {
            await manager.executeSubjectCommand("swapWithObjectBelow");
        },
    },
    {
        id: "codeFlea.swapSubjectLeft",
        execute: async (manager) => {
            await manager.executeSubjectCommand("swapWithObjectToLeft");
        },
    },
    {
        id: "codeFlea.swapSubjectRight",
        execute: async (manager) => {
            await manager.executeSubjectCommand("swapWithObjectToRight");
        },
    },
    {
        id: "codeFlea.addSubjectUp",
        execute: async (manager) => {
            await manager.executeSubjectCommand("addObjectAbove");
        },
    },
    {
        id: "codeFlea.addSubjectDown",
        execute: async (manager) => {
            await manager.executeSubjectCommand("addObjectBelow");
        },
    },
    {
        id: "codeFlea.addSubjectLeft",
        execute: async (manager) => {
            await manager.executeSubjectCommand("addObjectToLeft");
        },
    },
    {
        id: "codeFlea.addSubjectRight",
        execute: async (manager) => {
            await manager.executeSubjectCommand("addObjectToRight");
        },
    },
    {
        id: "codeFlea.nextSubjectRight",
        execute: async (manager) => {
            await manager.executeSubjectCommand("nextObjectRight");
        },
    },
    {
        id: "codeFlea.nextSubjectLeft",
        execute: async (manager) => {
            await manager.executeSubjectCommand("nextObjectLeft");
        },
    },
    {
        id: "codeFlea.nextSubjectUp",
        execute: async (manager) => {
            await manager.executeSubjectCommand("nextObjectUp");
        },
    },
    {
        id: "codeFlea.nextSubjectDown",
        execute: async (manager) => {
            await manager.executeSubjectCommand("nextObjectDown");
        },
    },
    {
        id: "codeFlea.deleteSubject",
        execute: async (manager) => {
            await manager.executeSubjectCommand("deleteObject");
        },
    },
    {
        id: "codeFlea.duplicateSubject",
        execute: async (manager) => {
            await manager.executeSubjectCommand("duplicateObject");
        },
    },
    {
        id: "codeFlea.changeToPreviousSubject",
        execute: async (manager) => {},
    },
    {
        id: "codeFlea.changeToBracketSubject",
        execute: async (manager) => {
            manager.changeMode({
                kind: "COMMAND",
                subjectName: "BRACKETS",
            });
        },
    },
    {
        id: "codeFlea.jumpToBracketSubject",
        execute: async (manager: CodeFleaManager) => {
            manager.jumpToSubject('BRACKETS');
        },
    },
    {
        id: "codeFlea.changeToWordSubject",
        execute: async (manager: CodeFleaManager) => {
            manager.changeMode({
                kind: "COMMAND",
                subjectName: "WORD",
            });
        },
    },
    {
        id: "codeFlea.jumpToWordSubject",
        execute: async (manager: CodeFleaManager) => {
            manager.jumpToSubject('WORD');
        },
    },
    {
        id: "codeFlea.changeToLineSubject",
        execute: async (manager: CodeFleaManager) => {
            manager.changeMode({
                kind: "COMMAND",
                subjectName: "LINE",
            });
        },
    },
    {
        id: "codeFlea.jumpToLineSubject",
        execute: async (manager: CodeFleaManager) => {
            manager.jumpToSubject('LINE');
        },
    },
    {
        id: "codeFlea.changeToInterwordSubject",
        execute: async (manager: CodeFleaManager) => {
            manager.changeMode({
                kind: "COMMAND",
                subjectName: "INTERWORD",
            });
        },
    },
    {
        id: "codeFlea.changeToSubwordSubject",
        execute: async (manager: CodeFleaManager) => {
            manager.changeMode({
                kind: "COMMAND",
                subjectName: "SUBWORD",
            });
        },
    },
    {
        id: "codeFlea.changeToHalfBracketSubjectRight",
        execute: async (manager: CodeFleaManager) => {
            manager.changeMode({
                kind: "COMMAND",
                subjectName: "BRACKETS",
                half: "RIGHT"
            });
        },
    },
    {
        id: "codeFlea.changeToHalfBracketSubjectLeft",
        execute: async (manager: CodeFleaManager) => {
            manager.changeMode({
                kind: "COMMAND",
                subjectName: "BRACKETS",
                half: "LEFT"
            });
        },
    },
    {
        id: "codeFlea.changeToHalfLineSubjectRight",
        execute: async (manager: CodeFleaManager) => {
            manager.changeMode({
                kind: "COMMAND",
                subjectName: "LINE",
                half: "RIGHT"
            });
        },
    },
    {
        id: "codeFlea.changeToHalfLineSubjectLeft",
        execute: async (manager: CodeFleaManager) => {
            manager.changeMode({
                kind: "COMMAND",
                subjectName: "LINE",
                half: "LEFT"
            });
        },
    },
    {
        id: "codeFlea.changeToCharSubject",
        execute: async (manager: CodeFleaManager) => {
            manager.changeMode({
                kind: "COMMAND",
                subjectName: "CHAR",
            });
        },
    },
    {
        id: "codeFlea.changeToBlockSubject",
        execute: async (manager: CodeFleaManager) => {
            manager.changeMode({
                kind: "COMMAND",
                subjectName: "BLOCK",
            });
        },
    },
    {
        id: "codeFlea.jumpToBlockSubject",
        execute: async (manager: CodeFleaManager) => {
            manager.jumpToSubject('BLOCK');
        },
    },
    {
        id: "codeFlea.changeToInsertMode",
        execute: async (manager: CodeFleaManager) => {
            manager.changeMode({ kind: "INSERT" });
        },
    },
    {
        id: "codeFlea.changeToCommandModeDefault",
        execute: async (manager: CodeFleaManager) => {
            manager.changeMode({
                kind: "COMMAND",
                subjectName: manager.config.defaultSubject,
            });
        },
    },
    {
        id: "codeFlea.changeToCommandModeLast",
        execute: async (manager: CodeFleaManager) => {
            manager.changeMode({
                kind: "COMMAND",
            });
        },
    },
    {
        id: "codeFlea.changeToExtendMode",
        execute: async (manager: CodeFleaManager) => {
            manager.changeMode({
                kind: "EXTEND",
                subjectName: "WORD",
            });
        },
    },
    {
        id: "codeFlea.jump",
        execute: async (manager: CodeFleaManager) => {
            manager.jump();
        },
    },
    {
        id: "codeFlea.scrollToCursor",
        execute: async (manager: CodeFleaManager) => {
            editor.scrollToCursorAtCenter(manager.editor);
        },
    },
    {
        id: "codeFlea.changeToInsertModeAppend",
        execute: async (manager) => {
            collapseSelections(manager.editor, "end");
            return manager.changeMode({ kind: "INSERT" });
        },
    },
    {
        id: "codeFlea.appendNewObject",
        execute: async (manager) => {
            await manager.executeSubjectCommand("appendNew");
            await manager.changeMode({ kind: "INSERT" });
        },
    },
    {
        id: "codeFlea.prependNewObject",
        execute: async (manager) => {
            await manager.executeSubjectCommand("prependNew");
            await manager.changeMode({ kind: "INSERT" });
        },
    },
    {
        id: "codeFlea.changeToInsertModeMidPoint",
        execute: async (manager) => {
            collapseSelections(manager.editor, "midpoint");
            manager.changeMode({ kind: "INSERT" });
        },
    },
    {
        id: "codeFlea.changeToInsertModeSurround",
        execute: async (manager) => {
            collapseSelections(manager.editor, "surround");
            manager.changeMode({ kind: "INSERT" });
        },
    },
    {
        id: "codeFlea.changeToInsertModePrepend",
        execute: async (manager) => {
            collapseSelections(manager.editor, "start");
            manager.changeMode({ kind: "INSERT" });
        },
    },
    {
        id: "codeFlea.repeatLastSkip",
        execute: async (manager) => {
            await manager.repeatLastSkip(Direction.forwards);
        },
    },
    {
        id: "codeFlea.repeatLastSkipBackwards",
        execute: async (manager) => {
            await manager.repeatLastSkip(Direction.backwards);
        },
    },
    {
        id: "codeFlea.skip",
        execute: async (manager) => {
            await manager.skip(Direction.forwards);
        },
    },
    {
        id: "codeFlea.skipBackwards",
        execute: async (manager) => {
            await manager.skip(Direction.backwards);
        },
    },
    {
        id: "codeFlea.skipOver",
        execute: async (manager) => {
            await manager.skipOver(Direction.forwards);
        },
    },
    {
        id: "codeFlea.skipOverBackwards",
        execute: async (manager) => {
            await manager.skipOver(Direction.backwards);
        },
    },
    {
        id: "codeFlea.openSpaceMenu",
        execute: async (manager) => {
            await manager.openSpaceMenu();
        },
    },
    {
        id: "codeFlea.openGoToMenu",
        execute: async (manager) => {
            await manager.openGoToMenu();
        },
    },
    {
        id: "codeFlea.goToFirstSubjectInScope",
        execute: async (manager) => {
            await manager.executeSubjectCommand("firstObjectInScope");
        },
    },
    {
        id: "codeFlea.goToLastSubjectInScope",
        execute: async (manager) => {
            await manager.executeSubjectCommand("lastObjectInScope");
        },
    },
    {
        id: "codeFlea.customVsCodeCommand",
        execute: async (manager) => {
            await manager.customVsCodeCommand();
        },
    },
    {
        id: "codeFlea.change",
        execute: async (manager) => {
            await manager.changeMode({ kind: "INSERT" });
            await vscode.commands.executeCommand("deleteLeft");
        },
    },
    {
        id: "codeFlea.changeToLineEnd",
        execute: async (manager) => {
            collapseSelections(manager.editor, "start");
            await vscode.commands.executeCommand("deleteAllRight");
        },
    },
    {
        id: "codeFlea.scrollEditorUp",
        execute: async (manager: CodeFleaManager) => {
            editor.scrollEditor("up", manager.config.scrollStep);
        },
    },
    {
        id: "codeFlea.scrollEditorDown",
        execute: async (manager: CodeFleaManager) => {
            editor.scrollEditor("down", manager.config.scrollStep);
        },
    },
    {
        id: "codeFlea.newLineBelow",
        execute: async (manager) => {
            collapseSelections(manager.editor, "end");
            manager.changeMode({ kind: "INSERT" });
            await vscode.commands.executeCommand(
                "editor.action.insertLineAfter"
            );
        },
    },
    {
        id: "codeFlea.newLineAbove",
        execute: async (manager) => {
            collapseSelections(manager.editor, "start");
            manager.changeMode({ kind: "INSERT" });
            await vscode.commands.executeCommand(
                "editor.action.insertLineBefore"
            );
        },
    },
    {
        id: "codeFlea.goToPrevOccurrence",
        execute: async (manager: CodeFleaManager) => {
            manager.executeSubjectCommand("prevOccurrenceOfObject");
        },
    },
    {
        id: "codeFlea.goToNextOccurrence",
        execute: async (manager: CodeFleaManager) => {
            manager.executeSubjectCommand("nextOccurrenceOfObject");
        },
    },
    {
        id: "codeFlea.extendToPrevOccurrence",
        execute: async (manager: CodeFleaManager) => {
            manager.executeSubjectCommand("extendPrevOccurrenceOfObject");
        },
    },
    {
        id: "codeFlea.extendToNextOccurrence",
        execute: async (manager: CodeFleaManager) => {
            manager.executeSubjectCommand("extendNextOccurrenceOfObject");
        },
    },
    {
        id: "codeFlea.openModifyMenu",
        execute: async (manager) => {
            await manager.openModifyMenu();
        },
    },
    {
        id: "codeFlea.openViewMenu",
        execute: async (manager) => {
            await manager.openViewMenu();
        },
    },
    {
        id: "codeFlea.undoCursorCommand",
        execute: async (manager) => {
            await manager.undoLastCommand();
        },
    },
    {
        id: "codeFlea.undoCommand",
        execute: async (manager) => {
            await manager.undo();
        },
    },
    {
        id: "codeFlea.flipCaseFirstCharacter",
        execute: async (manager) => {
            await manager.executeModifyCommand("flipCaseFirstCharacter");
        },
    },
    {
        id: "codeFlea.transformToCamelCase",
        execute: async (manager) => {
            await manager.executeModifyCommand("transformToCamelCase");
        },
    },
];
